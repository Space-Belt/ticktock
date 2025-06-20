export interface UnistylesThemeType {
  colors: {
    background: {
      primary: string; // 주요 배경색
      secondary: string; // 섹션 구분용 배경색
      accent: string; // 강조 배경색 (알림 등)
      card: string; // 카드 배경색
      overlay: string; // 반투명 오버레이 색상
    };
    text: {
      primary: string; // 기본 텍스트 색상
      secondary: string; // 서브 텍스트 색상
      link: string; // 링크 텍스트 색상
      heading: string; // 헤딩 텍스트 색상
      muted: string; // 비활성화된 텍스트 색상
      error: string; // 오류 메시지 텍스트 색상
      success: string; // 성공 메시지 텍스트 색상
      warning: string; // 경고 메시지 텍스트 색상
    };
    button: {
      primary: string; // 버튼 배경색
      secondary: string; // 비활성화된 버튼 배경색
      hover: string; // 버튼 호버 효과 색상
      danger: string; // 위험 버튼 색상
      success: string; // 성공 버튼 색상
      disabled: string; // 비활성화된 버튼 색상
    };
    border: {
      primary: string; // 주요 구분선 색상
      secondary: string; // 얇은 구분선 색상
      card: string; // 카드 경계선 색상
    };
    shadow: {
      light: string; // 얇은 그림자 색상
      medium: string; // 중간 그림자 색상
      dark: string; // 강한 그림자 색상
    };
    icon: {
      primary: string; // 기본 아이콘 색상
      secondary: string; // 비활성화된 아이콘 색상
      highlight: string; // 강조된 아이콘 색상
    };
    textInput: {
      primary: string;
    };
  };
}

export const lightTheme: UnistylesThemeType = {
  colors: {
    background: {
      primary: '#FFFBEC', // 부드러운 크림색 배경
      secondary: '#F4F4F4', // 밝은 회색 배경
      accent: '#FFF5E1', // 강조 배경 (따뜻한 노란색)
      card: '#FFFFFF', // 카드 배경 (하얀색)
      overlay: 'rgba(0, 0, 0, 0.5)', // 오버레이 (반투명)
    },
    text: {
      primary: '#2A2A2A', // 기본 텍스트 (어두운 텍스트)
      secondary: '#4A4A4A', // 서브 텍스트 (회색)
      link: '#0066CC', // 링크 텍스트 (파란색)
      heading: '#1C1C1C', // 헤딩 텍스트 (조금 더 어두운)
      muted: '#7A7A7A', // 비활성화된 텍스트 (연한 회색)
      error: '#F44336', // 오류 텍스트 (빨간색)
      success: '#4CAF50', // 성공 텍스트 (초록색)
      warning: '#FFC107', // 경고 텍스트 (황금색)
    },
    button: {
      primary: '#E0B589', // 기본 버튼 배경 (파란색)
      secondary: '#E0E0E0', // 비활성화 버튼 (회색)
      hover: '#0056A2', // 버튼 호버 효과 (어두운 파란색)
      danger: '#F44336', // 위험 버튼 (빨간색)
      success: '#4CAF50', // 성공 버튼 (초록색)
      disabled: '#D3D3D3', // 비활성화된 버튼 (연한 회색)
    },
    border: {
      primary: '#E0E0E0', // 구분선 (연한 회색)
      secondary: '#D0D0D0', // 얇은 구분선 (약간 더 어두운 회색)
      card: '#D3D3D3', // 카드 경계선 (부드러운 회색)
    },
    shadow: {
      light: 'rgba(0, 0, 0, 0.1)', // 얇은 그림자 (부드러운 효과)
      medium: 'rgba(0, 0, 0, 0.2)', // 중간 그림자 (더 강한 효과)
      dark: 'rgba(0, 0, 0, 0.3)', // 강한 그림자 (강한 효과)
    },
    icon: {
      primary: '#2A2A2A', // 기본 아이콘 색상 (어두운 회색)
      secondary: '#7A7A7A', // 비활성화된 아이콘 (연한 회색)
      highlight: '#FF5722', // 강조 아이콘 (주황색)
    },
    textInput: {
      primary: '#f5f5f5',
    },
  },
};

export const darkTheme: UnistylesThemeType = {
  colors: {
    background: {
      primary: '#2A2A2A', // 어두운 배경
      secondary: '#3A3A3A', // 다크 회색 배경
      accent: '#444444', // 강조 배경 (짙은 회색)
      card: '#2A2A2A', // 카드 배경 (어두운 배경)
      overlay: 'rgba(255, 255, 255, 0.5)', // 오버레이 (반투명)
    },
    text: {
      primary: '#FFFBEC', // 기본 텍스트 (밝은 텍스트)
      secondary: '#B3B3B3', // 서브 텍스트 (밝은 회색)
      link: '#4A90E2', // 링크 텍스트 (파란색)
      heading: '#E0E0E0', // 헤딩 텍스트 (연한 회색)
      muted: '#7A7A7A', // 비활성화된 텍스트 (연한 회색)
      error: '#E57373', // 오류 텍스트 (연한 빨간색)
      success: '#66BB6A', // 성공 텍스트 (밝은 초록색)
      warning: '#FFEB3B', // 경고 텍스트 (밝은 황금색)
    },
    button: {
      primary: '#4A90E2', // 기본 버튼 배경 (파란색)
      secondary: '#585858', // 비활성화 버튼 (회색)
      hover: '#3F7A92', // 버튼 호버 효과 (어두운 파란색)
      danger: '#E57373', // 위험 버튼 (붉은색)
      success: '#66BB6A', // 성공 버튼 (초록색)
      disabled: '#808080', // 비활성화된 버튼 (어두운 회색)
    },
    border: {
      primary: '#4A4A4A', // 구분선 (어두운 회색)
      secondary: '#5A5A5A', // 얇은 구분선 (밝은 회색)
      card: '#666666', // 카드 경계선 (짙은 회색)
    },
    shadow: {
      light: 'rgba(0, 0, 0, 0.3)', // 얇은 그림자 (강한 효과)
      medium: 'rgba(0, 0, 0, 0.4)', // 중간 그림자 (더 강한 효과)
      dark: 'rgba(0, 0, 0, 0.5)', // 강한 그림자 (강한 효과)
    },
    icon: {
      primary: '#FFFBEC', // 기본 아이콘 색상 (밝은 크림색)
      secondary: '#7A7A7A', // 비활성화된 아이콘 (연한 회색)
      highlight: '#FF5722', // 강조 아이콘 (주황색)
    },
    textInput: {
      primary: '#f5f5f5',
    },
  },
};

export const light = {
  colors: {
    background: lightTheme.colors.background,
    text: lightTheme.colors.text,
  },
};

export const dark = {
  colors: {
    background: darkTheme.colors.background,
    text: darkTheme.colors.text,
  },
};
