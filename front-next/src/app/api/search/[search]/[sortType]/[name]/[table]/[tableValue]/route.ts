import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { headers } from "next/headers"

export async function GET(
  req: NextRequest,
  { params: { search, sortType, name, table, tableValue } }: { params: { search: string, sortType: string, name: string, table: string, tableValue: string } }
) {
  try {

    const urlForQuery = new URL(req.url);
    const type = urlForQuery.searchParams.get('type');

    const searchParam = search !== 'undefined' ? `&filters[title][$containsi]=${search}` : '';
    const sortParam = sortType !== 'undefined' ? sortType !== 'init' ? `&sort=${name}:${sortType}` : '' : '';
    const filterParam = table === 'department' ? `&filters[$and][0][department][id]=${tableValue}&filters[$and][1][status][id][$lt]=8` : table === 'person' ? `&filters[$and][0][asiignees][id][$in]=${tableValue}&filters[$and][1][status][id][$lt]=8` : table === 'closed' ? `&filters[$and][0][status][id][$eq]=8&filters[$and][1][department][id][$eq]=${tableValue}` : table === 'createdUserBy' ? `&filters[$and][0][createdUserBy][id][$eq]=${tableValue}&filters[$and][1][status][id][$lt]=8` : ''

    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/tasks?populate[createdUserBy][populate][avatar]=*&populate[asiignees][populate][avatar]=*&populate[status][populate][fields]=*&populate[priority][populate][fields]=*&populate[department][populate][fields]=*&populate[carWashes][populate][fields]=*&populate[parentTask][populate][fields]=*&filters[type]=${type}${searchParam}${sortParam}${filterParam}`;
    const headerlist = headers();
    const auth = headerlist.get('authorization')
    const { data } = await axios.get(url, {
      headers: {
        Authorization: auth
      }
    });

    return NextResponse.json(data.data);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    console.log('here');
    return NextResponse.json({ error: message }, { status: 500 });
  }
}