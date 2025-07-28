import PrivacyInfo from "@/components/PrivacyInfo/PrivacyInfo";
import styles from "./privacy.module.scss";
import GetInTouch from "@/components/GetInTouch/GetInTouch";

export default function PrivacyPage() {
    return (
        <div className={styles.privacySection}>
            <PrivacyInfo />
            <GetInTouch />
        </div>
    );
}
