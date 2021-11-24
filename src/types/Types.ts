export type tabType = {
  id: string;
  title: string;
  sort: sort;
}

export type sort = "all" | "fav" | "old";

export type alertTypes = "danger" | "warning" | "success" | "primary" | "";
