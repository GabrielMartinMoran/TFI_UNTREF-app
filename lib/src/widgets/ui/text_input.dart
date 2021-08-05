import 'package:app/src/configs/pallete.dart';
import 'package:flutter/material.dart';

class TextInput extends StatefulWidget {
  final String placeholder;
  final FormFieldValidator<String>? validator;
  final TextEditingController? controller;
  final bool? hideContent;
  TextInput(
      {Key? key,
      required this.placeholder,
      this.validator,
      this.controller,
      this.hideContent})
      : super(key: key);

  @override
  _TextInputState createState() => _TextInputState(
      this.placeholder, validator, this.controller, this.hideContent);
}

class _TextInputState extends State<TextInput> {
  final String placeholder;
  final FormFieldValidator<String>? validator;
  final TextEditingController? controller;
  final bool? hideContent;
  _TextInputState(
      this.placeholder, this.validator, this.controller, this.hideContent);

  @override
  Widget build(BuildContext context) {
    return Container(
        child: TextFormField(
      //cursorColor: Pallete.primary,
      //style: TextStyle(color: Pallete.fontColor),
      decoration: InputDecoration(hintText: this.placeholder),
      validator: this.validator,
      controller: this.controller,
      autovalidateMode: AutovalidateMode.onUserInteraction,
      obscureText: this.hideContent ?? false,
    ));
  }
}
