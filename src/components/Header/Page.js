"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Home, Search } from "lucide-react";
import styles from "./Header.module.scss";
import Images from "../../assets/images";
import SearchDrawer from "./SearchDrawer/Page";
import { useRouter } from 'next/navigation';

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const router = useRouter();

  const goToHome = () => {
    router.push('/');
  };

  return (
    <>
      <div className={styles.headerWrapper}>
        <div className={styles.headerTop}>
          <Image
            src={Images.Logo}
            alt="Poki Logo"
            width={70}
            height={70}
            className={styles.logo}
          />
        </div>
        <div className={styles.headerBottom}>

          <div className={styles.iconBox} onClick={goToHome}>
            <Home size={20} />
          </div>
          <div className={styles.iconBox} onClick={() => setOpenDrawer(true)}>
            <Search size={20} />
          </div>
        </div>
      </div>

      {openDrawer && (
        <div className={styles.drawerWrapper}>
          <SearchDrawer setOpenDrawer={setOpenDrawer} />
        </div>
      )}
    </>
  );
};

export default Header;

