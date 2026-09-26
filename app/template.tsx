import { SiteFooter } from "@/components/layout/SiteFooter";
import { MotionScope } from "@/components/motion/MotionScope";

export default function Template({ children }: { children: React.ReactNode }) {
  return (
    <MotionScope>
      <main id="content">{children}</main>
      <SiteFooter />
    </MotionScope>
  );
}
