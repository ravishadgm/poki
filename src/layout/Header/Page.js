"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Home, Search } from "lucide-react";
import styles from "./styles.module.scss";
import Images from "../../../public/images/index";
import { useRouter } from 'next/navigation';
import SearchDrawer from "@/components/SearchDrawer/SearchDrawer";
import APP_CONFIG from "@/utils/config";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [visible, setVisible] = useState(false);
  const router = useRouter();

  const goToHome = () => {
    router.push('/');
  };

  const handleOpenDrawer = () => {
    setVisible(true);
    setTimeout(() => {
      setOpenDrawer(true);
    }, 10);
  };

  const handleCloseDrawer = () => {
    setOpenDrawer(false);
    setTimeout(() => {
      setVisible(false);
    }, 500);
  };

  return (
    <>
      <div className={styles.headerWrapper}>
        <div className={styles.headerTop}>
          <Image
            src={Images.Logo}
             alt={`${APP_CONFIG.appName} Logo`} 

            className={styles.logo}
          />
        </div>
        <div className={styles.headerBottom}>
          <div className={styles.iconBox} onClick={goToHome}>
            <Home size={20} />
          </div>
          <div className={styles.iconBox} onClick={handleOpenDrawer}>
            <Search size={20} />
          </div>
        </div>
      </div>

      {visible && (
        <div className={`${styles.drawerWrapper} ${openDrawer ? styles.open : styles.close}`}>
          <SearchDrawer setOpenDrawer={handleCloseDrawer} />
        </div>
      )}
    </>
  );
};

export default Header;
