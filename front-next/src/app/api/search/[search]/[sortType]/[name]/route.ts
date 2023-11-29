import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';
import { headers } from "next/headers"

export async function GET(
  req: NextRequest,
  { params: { search, sortType, name, type } }: { params: { search: string, sortType: string, name: string, type: string } }
) {
  try {

    const urlForQuery = new URL(req.url);
    const type = urlForQuery.searchParams.get('type');

    const searchParam = search !== 'undefined' ? `&filters[title][$containsi]=${search}` : '';
    const sortParam = sortType !== 'undefined' ? sortType !== 'init' ? `&sort=${name}:${sortType}` : '' : '';
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/tasks?populate[createdUserBy][populate][avatar]=*&populate[status][populate][fields]=*&populate[priority][populate][fields]=*&populate[department][populate][fields]=*&populate[carWashes][populate][fields]=*&filters[type]=${type}${searchParam}${sortParam}`;
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
    return NextResponse.json({ error: message }, { status: 500 });
  }
}