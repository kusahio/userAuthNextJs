import { type NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { BASE_URL } from "./lib/strapi";

const protectedRoutes = [
	'/dashboard',
	'/profile',
];

function checkIsProtectedRoute(path: string): boolean {
	return protectedRoutes.includes(path);
}

export async function proxy(request: NextRequest) {
	const currentPath = request.nextUrl.pathname;

	const isProtected = checkIsProtectedRoute(currentPath);

	if (!isProtected) {
		return NextResponse.next();
	}

	try {
		const cookieStore = await cookies();
		const jwt = cookieStore.get('jwt');

		if (!jwt) {
			return NextResponse.redirect(new URL('/signin', request.url));
		}

		const response = await fetch(`${BASE_URL}/api/users/me`, {
			headers: {
				'Authorization': `Bearer ${jwt}`,
				'Content-Type': 'application/json',
			}
		});

		const userResponse = await response.json();

		if (!userResponse) {
			return NextResponse.redirect(new URL('/signin', request.url));
		}

		return NextResponse.next();

	} catch (error) {
		console.error(`Error verify user authentication: ${error}`);
		return NextResponse.redirect(new URL('/signin', request.url));
	}
}

export const config = {
	matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)', '/dashboard','/dashboard/:path*'],
};