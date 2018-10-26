import * as React from "react";

interface CachedImageProps {
  url: string;
}

interface CachedImageState {
  online: boolean;
  isUnavailable: boolean;
}

class CachedImage extends React.Component<CachedImageProps, CachedImageState> {
  state: CachedImageState = {
    isUnavailable: false,
    online: "onLine" in navigator ? navigator.onLine : true
  };

  updateOnlineStatus = () => {
    this.setState({ online: navigator.onLine });
  };

  async updateAvailability() {
    const { url } = this.props;
    let isUnavailable = false;
    if ("caches" in window) {
      if (!this.state.online) {
        const match = await window.caches.match(url);
        if (!match) {
          isUnavailable = true;
        }
      }
    }
    if (this.state.isUnavailable !== isUnavailable) {
      this.setState({ isUnavailable });
    }
  }

  componentDidMount() {
    addEventListener("offline", this.updateOnlineStatus);
    addEventListener("online", this.updateOnlineStatus);
    this.updateAvailability();
  }

  componentWillUnmount() {
    removeEventListener("offline", this.updateOnlineStatus);
    removeEventListener("online", this.updateOnlineStatus);
  }

  componentDidUpdate() {
    this.updateAvailability();
  }

  render() {
    if (this.state.isUnavailable) {
      return this.props.children || null;
    }
    return <img src={this.props.url} />;
  }
}

export default CachedImage;
