import 'package:app/src/configs/pallete.dart';
import 'package:flutter/material.dart';

class AppThemes {
  static final ThemeData darkTheme = ThemeData.dark().copyWith(
      primaryColor: Pallete.primary,
      accentColor: Pallete.secondary,
      primaryIconTheme: IconThemeData(color: Pallete.overSurface),
      scaffoldBackgroundColor: Pallete.background,
      errorColor: Pallete.danger,
      sliderTheme: ThemeData.dark().sliderTheme.copyWith(
          valueIndicatorColor: Pallete.secondary,
          valueIndicatorTextStyle: TextStyle(color: Pallete.overSecondary)));

  static final ThemeData lightTheme = ThemeData.light().copyWith(
      primaryColor: Pallete.primary,
      accentColor: Pallete.secondary,
      primaryIconTheme: IconThemeData(color: Pallete.overSurface),
      scaffoldBackgroundColor: Pallete.background,
      errorColor: Pallete.danger);
}
