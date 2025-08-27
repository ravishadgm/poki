import GetInTouch from "@/components/GetInTouch/GetInTouch";
import PrivacyHeader from "@/layout/PrivacyHeader/PrivacyHeader";
import TermsConditionInfo from "@/components/TermsConditionInfo/TermsConditionInfo";

export default function PrivacyPage() {
    return (
        <div style={{ backgroundColor: '#ffffff' }}>
            <PrivacyHeader title="Terms & Conditions" />
            <TermsConditionInfo />
            <GetInTouch />
        </div>
    );
}
