declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGAElement>>
  export default content
}

declare module '*.css' {
  interface IClassNames {
    [className: string]: string
  }
  const classNames: IClassNames
  export = classNames
}
