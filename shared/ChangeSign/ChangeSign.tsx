import Link from "next/link";
import {SignLink} from "../interface";
import styles from "./index.module.scss";

export default function ChangeSign({href,textContent} : SignLink)
{
	return(
		<Link href={href} passHref>
			<a className={styles.link}>
			{textContent}
			</a>
			</Link>
	)
}