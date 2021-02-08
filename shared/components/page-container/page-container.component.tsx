import Header from "../header/header.component";
import Menu from "../menu/menu.component";
import styles from './page-container.module.scss';

export type PageContainerProps = {
    children: any;
};

export default function PageContainer({ children }: PageContainerProps) {
    return (
      <>
          <Header />
          <Menu />
          <div className={styles.content}>{children}</div>
      </>
    );
}