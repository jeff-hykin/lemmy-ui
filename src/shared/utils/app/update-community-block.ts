import { BlockCommunityResponse, MyUserInfo } from "lemmy-js-client";
import { i18n } from "../../i18next";
import { UserService } from "../../services";
import { toast } from "../../toast";

export default function updateCommunityBlock(
  data: BlockCommunityResponse,
  myUserInfo: MyUserInfo | undefined = UserService.Instance.myUserInfo
) {
  if (myUserInfo) {
    if (data.blocked) {
      myUserInfo.community_blocks.push({
        person: myUserInfo.local_user_view.person,
        community: data.community_view.community,
      });
      toast(`${i18n.t("blocked")} ${data.community_view.community.name}`);
    } else {
      myUserInfo.community_blocks = myUserInfo.community_blocks.filter(
        i => i.community.id !== data.community_view.community.id
      );
      toast(`${i18n.t("unblocked")} ${data.community_view.community.name}`);
    }
  }
}
