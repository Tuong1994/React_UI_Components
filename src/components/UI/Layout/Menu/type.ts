export type MenuItem = {
  id: string;
  label: React.ReactNode | React.ReactNode[];
  icon?: React.ReactNode | React.ReactNode[];
  children?: MenuItem[];
};

export type MenuItems = MenuItem[];
