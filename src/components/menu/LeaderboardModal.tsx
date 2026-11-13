import { useI18n } from "../../i18n/useI18n";
import type { ScoreEntry } from "../../game/storage";
import { Modal, ScoreBoard } from "../ui";

/** Local TOP-8 leaderboard, moved off the menu hero into its own modal. */
export default function LeaderboardModal({
  scores,
  onClose,
}: {
  scores: ScoreEntry[];
  onClose: () => void;
}) {
  const { t } = useI18n();

  return (
    <Modal title={t("game.leaderboard")} onClose={onClose}>
      <div className="gradient-border p-0.5 hard-shadow-sm">
        <div className="panel-grad">
          <ScoreBoard entries={scores} rows={8} />
        </div>
      </div>
      <p className="mt-3 text-center font-body text-[9px] font-bold tracking-[0.28em] text-jade-700 uppercase">
        {t("game.leaderboardHint")}
      </p>
    </Modal>
  );
}
