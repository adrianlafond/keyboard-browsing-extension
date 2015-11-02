

function onLinksUpdate(links) {
  SpatialNavigation.go(links);  
}

LinksObserver.connect(onLinksUpdate);
