export interface TreeNode {
    name: string;
    description: string;
    parent?: string;
    children?: TreeNode[];
};