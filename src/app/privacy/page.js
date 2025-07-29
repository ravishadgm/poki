import PrivacyInfo from "@/components/PrivacyInfo/PrivacyInfo";
import styles from "./privacy.module.scss";
import GetInTouch from "@/components/GetInTouch/GetInTouch";
import PrivacyHeader from "@/layout/PrivacyHeader/PrivacyHeader";

export default function PrivacyPage() {
    return (
        <div className={styles.privacySection}>
            <PrivacyHeader />
            <PrivacyInfo />
            <GetInTouch />
        </div>
    );
}
