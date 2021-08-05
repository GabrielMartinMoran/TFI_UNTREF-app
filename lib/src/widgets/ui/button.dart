import 'package:app/src/configs/pallete.dart';
import 'package:flutter/material.dart';

class Button extends StatelessWidget {
  final String text;
  final VoidCallback? onPressed;

  const Button({Key? key, required this.text, this.onPressed})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    return ElevatedButton(
        onPressed: onPressed,
        style: ButtonStyle(
            foregroundColor:
                MaterialStateProperty.all<Color>(Pallete.overPrimary),
            backgroundColor: MaterialStateProperty.all<Color>(Pallete.primary)),
        child: Text(this.text));
  }
}
