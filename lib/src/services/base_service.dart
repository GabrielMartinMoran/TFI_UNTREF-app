import 'dart:convert';
import 'package:app/src/configs/env.dart';
import 'package:app/src/services/auth_service.dart';
import 'package:app/src/utils/platform_checker.dart';
import 'package:http/http.dart' as http;

class BaseService {
  final AuthService _authService = new AuthService();

  Future<http.Response> get(String route, {bool authRequired = false}) async {
    Map<String, String> headers = {};
    if (authRequired) {
      headers['Authorization'] = 'Bearer ${this._authService.token}';
    }
    return await http.get(Uri.parse('${Env.apiUrl}$route'), headers: headers);
  }

  Future<http.Response> post(String route, Map<dynamic, dynamic>? body) async {
    return await http.post(Uri.parse('${Env.apiUrl}$route'),
        body: json.encode(body), headers: {"Content-Type": "application/json"});
  }
}
