import 'package:flutter/cupertino.dart';

class Pallete {
  static final bool useLightTheme = false;

  // Light theme
  static final Color _lightThemeBackground = new Color(0xFFe8e8e8);
  static final Color _lightThemeSurface = new Color(0xFFFFFFFF);
  static final Color _lightThemePrimary = new Color(0xFF5E72E5);
  static final Color _lightThemeSecondary = new Color(0xFF03DAC6);
  static final Color _lightThemeOverBackground = new Color(0xFFC2C2C2);
  static final Color _lightThemeOverSurface = new Color(0xFF111111);
  static final Color _lightThemeOverPrimary = new Color(0xFFFFFFFF);
  static final Color _lightThemeOverSecondary = new Color(0xFF000000);

  // Dark theme
  static final Color _darkThemeBackground = new Color(0xFF192039);
  static final Color _darkThemeSurface = new Color(0xFF1B2340);
  static final Color _darkThemePrimary = new Color(0xFF4879FA);
  static final Color _darkThemeSecondary = new Color(0xFFF5D467);
  static final Color _darkThemeOverBackground = new Color(0xFFC2C2C2);
  static final Color _darkThemeOverSurface = new Color(0xFFE1E1E1);
  static final Color _darkThemeOverPrimary = new Color(0xFFE1E1E1);
  static final Color _darkThemeOverSecondary = new Color(0xFF000000);

  static Color get background {
    if (useLightTheme) return _lightThemeBackground;
    return _darkThemeBackground;
  }

  static Color get surface {
    if (useLightTheme) return _lightThemeSurface;
    return _darkThemeSurface;
  }

  static Color get primary {
    if (useLightTheme) return _lightThemePrimary;
    return _darkThemePrimary;
  }

  static Color get secondary {
    if (useLightTheme) return _lightThemeSecondary;
    return _darkThemeSecondary;
  }

  static Color get overBackground {
    if (useLightTheme) return _lightThemeOverBackground;
    return _darkThemeOverBackground;
  }

  static Color get overSurface {
    if (useLightTheme) return _lightThemeOverSurface;
    return _darkThemeOverSurface;
  }

  static Color get overPrimary {
    if (useLightTheme) return _lightThemeOverPrimary;
    return _darkThemeOverPrimary;
  }

  static Color get overSecondary {
    if (useLightTheme) return _lightThemeOverSecondary;
    return _darkThemeOverSecondary;
  }

  //static final Color primary = new Color(0xFF3658D8);
  //static final Color secondary = new Color(0xFFD1D3DC);
  static final Color gray = new Color(0xFF121212);
  static final Color container = new Color(0xFF1C2754);
  //static final Color background = new Color(0xFF131D3B);
  static final Color fontColor = new Color(0xFFFFFFFF);
  static final Color turnedOn = new Color(0xFFe9c46a);

  static final Color ok = new Color(0xFF90be6d);
  static final Color danger = new Color(0xFFf94144);

  // Charts
  static final Color chartLine = new Color(0xFF37434D);
  static final Color chartText = new Color(0xFF68737D);

  static final List<Color> currentGradient = [
    const Color(0xff23b6e6),
    const Color(0xff02d39a),
  ];
  /*static final List<Color> powerGradient = [
    const Color(0xffD22E2B),
    const Color(0xffD13502),
  ];*/
  static final List<Color> powerGradient = [
    const Color(0xffFF6156),
    const Color(0xffFF9151),
  ];
}
