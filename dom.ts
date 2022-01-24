/**
 * Waits for an element satisfying selector to exist, then resolves promise with the element.
 *
 * @param selector
 * @returns {Promise}
 */
export function elementReady(selector: string): Promise<Element> {
  return new Promise((resolve) => {
    const domElement = document.querySelector(selector);

    if (domElement) {
      return resolve(domElement);
    }

    new MutationObserver((_mutationRecords, observer) => {
      // Query for elements matching the specified selector
      Array.from(document.querySelectorAll(selector)).forEach((element) => {
        resolve(element);
        //Once we have resolved we don't need the observer anymore.
        observer.disconnect();
      });
    }).observe(document.documentElement, {
      childList: true,
      subtree: true
    });
  });
}
  
