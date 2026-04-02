import { getTeamMemberBySlug } from "@/features/team/api/getTeamMemberBySlug";
import { createProfilePage } from "@/features/team/ui/createProfilePage";

const { generateMetadata, Page } = createProfilePage({
  getBySlug: getTeamMemberBySlug,
});

export { generateMetadata };

export default Page;
