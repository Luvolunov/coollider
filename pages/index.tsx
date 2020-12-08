import Link from "next/link";


export default function Home() {
  return (
	  <div>
		  <Link href="/sign-up"><a href="">Sign Up</a></Link>
		  <Link href="/sign-in"><a href="">Sign In</a></Link>
	  </div>
  );
}
