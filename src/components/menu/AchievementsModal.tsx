import { useI18n } from "../../i18n/useI18n";
import { Modal } from "../ui";
import AchievementsPanel from "../AchievementsPanel";

/** Achievement wall as a modal — keeps the menu hero clean. */
export default function AchievementsModal({
  unlocked,
  onClose,
}: {
  unlocked: string[];
  onClose: () => void;
}) {
  const { t } = useI18n();

  return (
    <Modal title={t("ach.title")} onClose={onClose} wide>
      <AchievementsPanel unlocked={unlocked} />
    </Modal>
  );
}
