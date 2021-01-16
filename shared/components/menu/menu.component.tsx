import { MenuProps } from './menu.props';
import styles from './menu.module.scss';

export default function Menu({children}: MenuProps){
    return(
        <aside className={styles.aside}>
            {children}
        </aside>
    )
}