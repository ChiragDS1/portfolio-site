import { Boxes, Building2, HeartPulse, Layers, UserRound } from "lucide-react";
import type { World } from "@/data/resume";

/** Tiny glyphs for the switcher and menu. One per world. */
export const WORLD_ICONS: Record<World["icon"], typeof Boxes> = {
  hub: Layers,
  about: UserRound,
  bank: Building2,
  health: HeartPulse,
  projects: Boxes,
};
