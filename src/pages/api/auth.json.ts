import type { APIRoute } from "astro";

export const prerender = false

export const POST: APIRoute = async ({ request }) => {
  console.log(request.body)
  const body = await request.json();
  const username = body.username;
  const password = body.password;
  console.log(body)
  if(username === "mr_robot_69420" && password === "BeepBoop1234") {
    return new Response(JSON.stringify({
        flag: import.meta.env.FLAG
      }), {
        status: 200
      })
  }

    
    return new Response(JSON.stringify({ error: "INCORRECT PASSWORD"}), { status: 400 });
  }