/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { useStore } from 'effector-react';
import { setTitle } from '../../store/title';
import { $promptStore } from '../../store/prompt';
import Card from '../../components/card/card.component';
import Button from '../../components/button/button.component';
import styles from './settings.module.scss';
import packageJson from '../../package.json';

export default function SettingsPage() {
  const promptEvent = useStore($promptStore) as any;
  const [isStandalone, setIsStandalone] = useState(false);
  useEffect(() => {
    setTitle('Настройки');
  });
  useEffect(() => {
    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
  });
  const promptInstall = async () => {
    promptEvent.prompt();
  };
  return (
    <div>
      <Card>
        {
          isStandalone
            ? <span className={styles.installTitle}>Версия приложения: {packageJson.version}</span>
            : (
              <>
                <span className={styles.installTitle}>Установить приложение</span>
                <div className={styles.buttonOuter}>
                  <Button onClick={promptInstall} disabled={!promptEvent}>Скачать</Button>
                </div>
                {
                  !promptEvent && (
                    <>
                      <span className={styles.errorMessage}>
                        Ваш браузер не поддерживает установку PWA :(
                      </span>
                      <span className={styles.smallMessage}>
                        Установку приложения поддерживают браузеры: <b>Chrome</b>, <b>Firefox</b>
                      </span>
                    </>
                  )
                }
              </>
            )
        }
      </Card>
    </div>
  );
}
