import axios from 'axios';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params: { search } }: { params: { search: string } }
) {
  try {
    const user = {
        jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MiwiaWF0IjoxNjk4MTU1NjExLCJleHAiOjE3MDA3NDc2MTF9.wzyI5f1cEN6RpirHjJAyTmth95uDmuEd9DDqHvLcylI',
    }
    const {data} = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/tickets?populate=*`, {
        headers: {
            Authorization: `Bearer ${user.jwt}`
        }
    });

    const filteredData = '';

    return NextResponse.json(data);
  } catch (error) {
    const message =
      error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}