import { authOptions } from '@/config/nextauth/auth';
import axios from 'axios';
import { getServerSession } from 'next-auth';
import { NextRequest, NextResponse } from 'next/server';
import { headers } from "next/headers"

export async function GET(
  req: NextRequest,
  { params: { search, sortType, name } }: { params: { search: string, sortType: string, name: string } }
) {
  try {

    const searchParam = search !== 'undefined' ? `&filters[title][$containsi]=${search}` : '';
    const sortParam = sortType !== 'undefined' ? sortType !== 'init' ? `&sort=${name}:${sortType}` : '' : '';
    const url = `${process.env.NEXT_PUBLIC_API_URL}/api/tasks?populate=*${searchParam}${sortParam}`;
    
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