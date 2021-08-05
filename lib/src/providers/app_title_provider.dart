import 'package:flutter/material.dart';

class AppTitleProvider with ChangeNotifier {
  String _appTitle = '';

  set appTitle(String value) {
    this._appTitle = value;
    notifyListeners();
  }

  String get appTitle {
    return this._appTitle;
  }
}
