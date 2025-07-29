import PrivacyInfo from "@/components/PrivacyInfo/PrivacyInfo";
import GetInTouch from "@/components/GetInTouch/GetInTouch";
import PrivacyHeader from "@/layout/PrivacyHeader/PrivacyHeader";

export default function PrivacyPage() {
    return (
        <div style={{ backgroundColor: '#ffffff' }}>
            <PrivacyHeader />
            <PrivacyInfo />
            <GetInTouch />
        </div>
    );
}
