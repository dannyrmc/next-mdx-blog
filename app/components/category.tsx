interface CategoryProps {
  category_label: string;
}

export default function Category(props: CategoryProps) {
  return (
    <div className="max-h-[32px] w-max rounded-lg border border-border bg-muted/10 py-2 pl-3 pr-2.5">
      <p className="font-sans text-[12px] font-semibold uppercase leading-[12px] tracking-[2.24px] text-primary sm:text-[14px] sm:leading-[14px]">
        {props.category_label}
      </p>
    </div>
  );
}
