"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Home, Search } from "lucide-react";
import styles from "./Header.module.scss";
import Images from "../../assets/images";
import { useRouter } from 'next/navigation';
import SearchDrawer from "@/components/SearchDrawer/Page";

const Header = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const router = useRouter();

  const goToHome = () => {
    router.push('/');
  };

  return (
    <>
      <div className={styles.headerWrapper}>
        <div className={styles.headerContent}>
          <div className={styles.logoContainer}>
            <Image
              src={Images.Logo}
              alt="Poki Logo"
              width={40}
              height={40}
              className={styles.logo}
              onClick={goToHome}
            />
          </div>
          
          <div className={styles.navIcons}>
            <div className={styles.iconBox} onClick={goToHome}>
              <Home size={18} />
            </div>
            <div className={styles.iconBox} onClick={() => setOpenDrawer(true)}>
              <Search size={18} />
            </div>
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
