type Props = {
    message: string;
    alert_type: string;
}
export function Alert(props: Props) {
    const alert_class_name: string = "alert " + props.alert_type;
  return (
    <div className={alert_class_name} role="alert">
      {props.message}
    </div>
  );
}
