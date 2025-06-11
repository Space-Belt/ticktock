export const Font = {
  // Display - 큰 제목, 강조된 텍스트
  displayBold: {
    fontFamily: 'NanumSquare Neo ExtraBold',
    fontSize: 32,
  },
  display: {
    fontFamily: 'NanumSquare Neo Bold',
    fontSize: 28,
  },
  displayExtraBold: {
    fontFamily: 'NanumSquare Neo ExtraBold',
    fontSize: 32,
  },

  // Header - 주요 제목, 중요한 텍스트
  headerLarge: {
    fontFamily: 'NanumSquare Neo Regular', // Regular
    fontSize: 24,
  },
  headerLargeBold: {
    fontFamily: 'NanumSquare Neo Bold', // Bold
    fontSize: 24,
  },
  headerLargeExtraBold: {
    fontFamily: 'NanumSquare Neo ExtraBold', // ExtraBold
    fontSize: 24,
  },

  headerMedium: {
    fontFamily: 'NanumSquare Neo Regular', // Regular
    fontSize: 20,
  },
  headerMediumBold: {
    fontFamily: 'NanumSquare Neo Bold', // Bold
    fontSize: 20,
  },
  headerMediumExtraBold: {
    fontFamily: 'NanumSquare Neo ExtraBold', // ExtraBold
    fontSize: 20,
  },

  // Body - 일반 본문 텍스트
  bodyLarge: {
    fontFamily: 'NanumSquare Neo Regular', // Regular
    fontSize: 18,
  },
  bodyLargeBold: {
    fontFamily: 'NanumSquare Neo Bold', // Bold
    fontSize: 18,
  },
  bodyLargeExtraBold: {
    fontFamily: 'NanumSquare Neo ExtraBold', // ExtraBold
    fontSize: 18,
  },

  bodyMedium: {
    fontFamily: 'NanumSquare Neo Regular', // Regular
    fontSize: 16,
  },
  bodyMediumBold: {
    fontFamily: 'NanumSquare Neo Bold', // Bold
    fontSize: 16,
  },
  bodyMediumExtraBold: {
    fontFamily: 'NanumSquare Neo ExtraBold', // ExtraBold
    fontSize: 16,
  },

  bodySmall: {
    fontFamily: 'NanumSquare Neo Regular', // Regular
    fontSize: 14,
  },
  bodySmallBold: {
    fontFamily: 'NanumSquare Neo Bold', // Bold
    fontSize: 14,
  },
  bodySmallExtraBold: {
    fontFamily: 'NanumSquare Neo ExtraBold', // ExtraBold
    fontSize: 14,
  },

  // 작은 텍스트
  caption: {
    fontFamily: 'NanumSquare Neo Regular', // Regular
    fontSize: 12,
  },
  captionBold: {
    fontFamily: 'NanumSquare Neo Bold', // Bold
    fontSize: 12,
  },
  captionExtraBold: {
    fontFamily: 'NanumSquare Neo ExtraBold', // ExtraBold
    fontSize: 12,
  },

  // 가장 작은 텍스트, 푸터나 알림 등
  tiny: {
    fontFamily: 'NanumSquare Neo Regular', // Regular
    fontSize: 10,
  },
  tinyBold: {
    fontFamily: 'NanumSquare Neo Bold', // Bold
    fontSize: 10,
  },
  tinyExtraBold: {
    fontFamily: 'NanumSquare Neo ExtraBold', // ExtraBold
    fontSize: 10,
  },

  // 메타 데이터, 세부 텍스트
  meta: {
    fontFamily: 'NanumSquare Neo Regular', // Regular
    fontSize: 8,
  },
  metaBold: {
    fontFamily: 'NanumSquare Neo Bold', // Bold
    fontSize: 8,
  },
  metaExtraBold: {
    fontFamily: 'NanumSquare Neo ExtraBold', // ExtraBold
    fontSize: 8,
  },
};

export type FontType = keyof typeof Font;
