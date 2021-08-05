import 'package:app/src/configs/pallete.dart';
import 'package:flutter/material.dart';

class FloatingContainer extends StatelessWidget {
  final Widget child;
  const FloatingContainer({Key? key, required this.child}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(20.0),
      margin: EdgeInsets.only(left: 10.0, right: 10.0, top: 5.0, bottom: 5.0),
      child: this.child,
      decoration: BoxDecoration(
          color: Pallete.surface, borderRadius: BorderRadius.circular(5.0)),
    );
  }
}
