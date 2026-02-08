import React from 'react';

export type ContainerVariant = 'regular' | 'big' | 'header' | 'footer';

type CommonProps = {
  children: React.ReactNode;
  className?: string; // klasa na OUTER wrapperze
  as?: React.ElementType;
  variant?: ContainerVariant;
};

type HeaderProps = CommonProps & {
  variant: 'header';
  innerClassName?: string; // tylko tu ma sens (klasa na INNER)
};

type NonHeaderProps = CommonProps & {
  variant?: Exclude<ContainerVariant, 'header'>;
  innerClassName?: never;
};

type Props = HeaderProps | NonHeaderProps;

function cx(...classes: Array<string | undefined | null | false>) {
  return classes.filter(Boolean).join(' ');
}

const defaultTagByVariant: Partial<Record<ContainerVariant, React.ElementType>> = {
  header: 'header',
  footer: 'footer',
};

const Container: React.FC<Props> = (props) => {
  const { children, className, as } = props;
  const variant: ContainerVariant = props.variant ?? 'regular';

  const Tag: React.ElementType = as ?? defaultTagByVariant[variant] ?? 'div';

  // Header: już masz poprawnie (2 wrappery)
  if (variant === 'header') {
    const { innerClassName } = props;
    return (
      <Tag className={cx('w-full px-[clamp(20px,6vw,100px)]', className)}>
        <div className={cx('mx-auto w-full max-w-432.5', innerClassName)}>{children}</div>
      </Tag>
    );
  }

  // Footer + Regular: też robimy 2 wrappery (outer padding, inner max-width)
  if (variant === 'footer' || variant === 'regular') {
    return (
      <Tag className={cx('w-full px-12.5', className)}>
        <div className="mx-auto w-full lg:max-w-[1199.5px]">{children}</div>
      </Tag>
    );
  }

  // Big: 2 wrappery (outer = gutter, inner = max-width 1600)
  return (
    <Tag
      className={cx(
        'w-full',
        // gutter (na outer)
        'px-[clamp(16px,11vw,50px)]',
        '[@media(min-width:479px)]:px-[50px]',
        className
      )}
    >
      <div className="mx-auto w-full max-w-[1600px]">{children}</div>
    </Tag>
  );
};

export default Container;
