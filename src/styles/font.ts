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

  // Header - 주요 제목, 중요한 텍스트
  headerLarge: {
    fontFamily: 'NanumSquare Neo Bold',
    fontSize: 24,
  },
  headerMedium: {
    fontFamily: 'NanumSquare Neo Bold',
    fontSize: 20,
  },

  // Body - 일반 본문 텍스트
  bodyLarge: {
    fontFamily: 'NanumSquare Neo Regular',
    fontSize: 18,
  },
  bodyMedium: {
    fontFamily: 'NanumSquare Neo Regular',
    fontSize: 16,
  },
  bodySmall: {
    fontFamily: 'NanumSquare Neo Regular',
    fontSize: 14,
  },

  // 작은 텍스트
  caption: {
    fontFamily: 'NanumSquare Neo Regular',
    fontSize: 12,
  },

  // 가장 작은 텍스트, 푸터나 알림 등
  tiny: {
    fontFamily: 'NanumSquare Neo Regular',
    fontSize: 10,
  },

  // 메타 데이터, 세부 텍스트
  meta: {
    fontFamily: 'NanumSquare Neo Regular',
    fontSize: 8,
  },
};

export type FontType = keyof typeof Font;
