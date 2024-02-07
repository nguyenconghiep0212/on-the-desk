export function scrollToView(ref, delay = 0) {
    if (ref.current) {
      setTimeout(() => {
        ref.current.scrollIntoView({
          top: 0,
          behavior: "smooth",
        });
      }, delay);
    }
  }