export function isNPM(name: string): boolean {
  return /^(?:@([^/]+?)[/])?([^/]+?)$/.test(name)
}