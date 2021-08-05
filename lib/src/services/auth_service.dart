import 'package:app/src/configs/env.dart';
import 'dart:convert';
import 'package:http/http.dart' as http;
import 'package:get_storage/get_storage.dart';

class AuthService {
  late GetStorage _storage;
  final String TOKEN_KEY = 'token';

  AuthService() {
    this._storage = GetStorage();
  }

  Future<void> login(String email, String password) async {
    try {
      String token = await this._login(email, password);
      this._storage.write(TOKEN_KEY, token);
    } catch (e) {
      print('Login error: $e');
    }
  }

  bool isAuthenticated() {
    return this._storage.hasData(TOKEN_KEY);
  }

  String get token {
    return this._storage.read(TOKEN_KEY);
  }

  void logout() {
    this._storage.remove(TOKEN_KEY);
  }

  Future<String> _login(String email, String password) async {
    final response = await http.post(Uri.parse('${Env.apiUrl}/auth/login'),
        body: json.encode({'email': email, 'password': password}),
        headers: {"Content-Type": "application/json"});
    return json.decode(response.body)['token'];
  }
}
