import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params: { search, sortType, name } }: { params: { search: string, sortType: string, name: string } }
) {
  try {
    const user = {
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjk4MTU1NjExLCJleHAiOjE3MDA3NDc2MTF9.wzyI5f1cEN6RpirHjJAyTmth95uDmuEd9DDqHvLcylI',
    }

    const searchParam = search !== 'undefined' ? `&filters[title][$containsi]=${search}` : '';
    const sortParam = sortType !== 'undefined' ? sortType !== 'init' ? `&sort=${name}:${sortType}` : '' : '';
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/tasks?populate=*${searchParam}${sortParam}`;

    const { data } = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${user.jwt}`
            }
        });     


    return NextResponse.json(data.data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}