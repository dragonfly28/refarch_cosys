/*
 * Copyright (c): it@M - Dienstleister für Informations- und Telekommunikationstechnik
 * der Landeshauptstadt München, 2020
 */
package de.muenchen.refarch.cosys.domain;

import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import javax.persistence.Column;
import javax.persistence.Entity;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;


/**
 * This class represents a TheEntity.
 * <p>
 * The entity's content will be loaded according to the reference variable.
 * </p>
 */
@Entity
// Definition of getter, setter, ...
@Getter
@Setter
@ToString(callSuper = true)
@EqualsAndHashCode(callSuper = true)
@NoArgsConstructor
public class TheEntity extends BaseEntity  {

    private static final long serialVersionUID = 1L;

    // ========= //
    // Variables //
    // ========= //

    @Column(name="textattribute", nullable=false, length=8)
    @NotNull
    @Size(min=2, max=8)
    private String textAttribute;

}
