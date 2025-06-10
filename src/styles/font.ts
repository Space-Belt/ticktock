export const Font = {
  displayBold: {
    fontFamily: 'NanumSquare Neo ExtraBold',
    fontSize: 20,
  },
  display: {
    fontFamily: 'NanumSquare Neo Bold',
    fontSize: 20,
  },
  displayLight: {
    fontFamily: 'NanumSquare Neo Bold',
    fontSize: 18,
  },
  titleBold: {
    fontFamily: 'NanumSquare Neo ExtraBold',
    fontSize: 16,
  },
  title: {
    fontFamily: 'NanumSquare Neo Bold',
    fontSize: 16,
  },
  headlineBold: {
    fontFamily: 'NanumSquare Neo ExtraBold',
    fontSize: 14,
  },
  headline: {
    fontFamily: 'NanumSquare Neo Bold',
    fontSize: 14,
  },
  subheadline: {
    fontFamily: 'NanumSquare Neo Regular',
    fontSize: 14,
  },
  caption: {
    fontFamily: 'NanumSquare Neo Light',
    fontSize: 13,
  },
  captionSecond: {
    fontFamily: 'NanumSquare Neo Regular',
    fontSize: 13,
  },
  captionSmallRegular: {
    fontFamily: 'NanumSquare Neo Regular',
    fontSize: 11,
  },
  captionSmall: {
    fontFamily: 'NanumSquare Neo Light',
    fontSize: 11,
  },
  captionSmallSecond: {
    fontFamily: 'NanumSquare Neo Bold',
    fontSize: 9,
  },
};

export type FontType = keyof typeof Font;
