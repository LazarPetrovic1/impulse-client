import { useTranslation } from "react-i18next";
import { SettingsListItem } from "../../components/features";
import { LanguageSwitcher } from "../../components/features/i18n";
import { ThemeSwitcher } from "../../components/features/themes";
import { withSettingsLayout } from "./_layout";
import { FontSizeSwitcher, FontSwitcher } from "../../components/features/font";

function Settings() {
  const { t } = useTranslation();
	return (
		<article
			style={{
				minHeight: "calc(100vh - 94px - 40px - 40px)",
				display: "flex",
				flexDirection: "column",
			}}
		>
			<h2 className="text-primary text-center display-4 m-0">{t("settings.basic")}</h2>
			<ul
				className="list-group"
				style={{ marginTop: "0.5rem" }}
			>
				<SettingsListItem $getCenter className="list-group-item d-flex pl-0">
					<LanguageSwitcher />
				</SettingsListItem>
				<SettingsListItem $getCenter className="list-group-item d-flex pl-0">
					<ThemeSwitcher />
				</SettingsListItem>
				<SettingsListItem $getCenter className="list-group-item d-flex pl-0">
					<FontSwitcher />
				</SettingsListItem>
				<SettingsListItem $islast $getCenter className="list-group-item d-flex pl-0">
					<FontSizeSwitcher />
				</SettingsListItem>
			</ul>
		</article>
  )
}

export default withSettingsLayout(Settings);