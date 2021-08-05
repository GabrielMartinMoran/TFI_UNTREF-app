import 'package:app/src/utils/platform_checker.dart';

class Env {
  static final String _mobileApiUrl = 'http://10.0.2.2:5000/api';
  static final String _webApiUrl = 'http://localhost:5000/api';

  static String get apiUrl {
    if (PlatformChecker.isWeb()) return _webApiUrl;
    return _mobileApiUrl;
  }
}
