import Link from "next/link";

export default function Menu(){
    return(
        <div className="flex justify-center gap-10">
            <Link href="/">strona Głowna</Link>
            <Link href="/strona1">strona 1</Link>
            <Link href="/strona2">strona 2</Link>
            <Link href="/strona3">strona 3</Link>
            <Link href="/strona4">strona 4</Link>
            <Link href="/strona5">strona 5</Link>
            <Link href="/strona6">strona 6</Link>
            <Link href="/strona7">strona 7</Link>
          </div>
    )
}