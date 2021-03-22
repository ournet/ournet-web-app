import * as React from "react";

type PageContentSectionProps = {
  view?: PageContentSectionView;
  // children: React.ReactNode
};

type PageContentSectionView = "first-white";

export default class PageContentSection extends React.PureComponent<
  PageContentSectionProps,
  any
> {
  render() {
    const { view, children } = this.props;
    return (
      <div className={`c-page-cs c-page-cs--${view}`}>
        <div className="o-wrapper o-wrapper--small">{children}</div>
      </div>
    );
  }
}
