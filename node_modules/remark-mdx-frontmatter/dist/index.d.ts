import { Attacher } from 'unified';
export interface RemarkMdxFrontmatterOptions {
    /**
     * If specified, the YAML data is exported using this name. Otherwise, each
     * object key will be used as an export name.
     */
    name?: string;
}
/**
 * A remark plugin to expose frontmatter data as named exports.
 *
 * @param options - Optional options to configure the output.
 * @returns A unified transformer.
 */
export declare const remarkMdxFrontmatter: Attacher<[RemarkMdxFrontmatterOptions?]>;
